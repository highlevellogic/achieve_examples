/*
IMPORTANT:
request "Content-type" is "application/xml;charset=utf-8"

This example uses @nodable/sax from the examples application package.
From the Achieve examples directory, run npm install.
This is a modified example available @ https://www.npmjs.com/package/@nodable/sax
Modifications are made to run in servlet.
See stream handling below the sax code.

This servlet runs async. (session.allowAsync = true;)
Servlet must handle response and end and must be adequately protected with try-catch.
*/
'use strict';

import { SaxParser } from '@nodable/sax';

export function servlet(session) {

session.allowAsync = true;
session.response.setHeader("Content-Type","application/x-ndjson;charset=utf-8");

let depth = 0;
let currentType = "";
let currentValues = [];
let text = "";

function send(name,values) {
  session.response.write(JSON.stringify({[name]:values}) + "\n");
}

const parser = new SaxParser({
  fxpOptions: {
    skip: { attributes: false },
  },

  onStartElement(name,attrs) {
    depth++;

    if (depth === 2) {
      currentType = name;
      currentValues = Object.values(attrs);
    }

    text = "";
  },

  onText(value) {
    text += value;
  },

  onEndElement(name) {
    if (depth === 3) {
      const value = text.trim();
      if (value) currentValues.push(value);
    }

    if (depth === 2) {
      send(currentType,currentValues);
      currentType = "";
      currentValues = [];
    }

    text = "";
    depth--;
  },

  onError(err) {
    if (!session.response.writableEnded) {
      session.response.write(JSON.stringify({error:err.message}) + "\n");
      session.response.end();
    }
  },

  onEnd() {
    if (!session.response.writableEnded) session.response.end();
  },
});

session.request.on("data",function(chunk) {
  try {
    parser.write(chunk);
  } catch (err) {
    if (!session.response.writableEnded) {
      session.response.write(JSON.stringify({error:err.message}) + "\n");
      session.response.end();
    }
  }
});

session.request.on("end",function() {
  try {
    parser.end();
  } catch (err) {
    if (!session.response.writableEnded) {
      session.response.write(JSON.stringify({error:err.message}) + "\n");
      session.response.end();
    }
  }
});

}
