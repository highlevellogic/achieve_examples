// advanced/distributed/worker/servlets/filterSvg.jss.mjs

import { SaxParser } from "@nodable/sax";

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll('"',"&quot;")
    .replaceAll("<","&lt;");
}

function escapeText(value) {
  return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;");
}

function openingTag(name,attributes) {
  const serialized = Object.entries(attributes)
    .map(([key,value]) => ` ${key}="${escapeAttribute(value)}"`)
    .join("");

  return `<${name}${serialized}>`;
}

export function servlet(session) {
  session.allowAsync = true;
  session.response.setHeader("Content-Type","image/svg+xml;charset=utf-8");

  let boundary;
  const emitted = [];

  const parser = new SaxParser({
    fxpOptions: {
      skip: {attributes:false}
    },

    onStartElement(name,attributes) {
      let include = emitted.length === 0 || emitted[emitted.length - 1];

      if (include && name === "circle" && attributes.id === "boundary") {
        boundary = {
          x: Number(attributes.cx),
          y: Number(attributes.cy),
          radius: Number(attributes.r)
        };
      }

      if (include && name === "circle" && attributes.class === "dot") {
        if (!boundary) throw new Error("The SVG boundary circle must precede its dots.");

        const dx = Number(attributes.cx) - boundary.x;
        const dy = Number(attributes.cy) - boundary.y;
        include = dx * dx + dy * dy <= boundary.radius * boundary.radius;
      }

      emitted.push(include);
      if (include) session.response.write(openingTag(name,attributes));
    },

    onText(value) {
      if (emitted[emitted.length - 1]) session.response.write(escapeText(value));
    },

    onEndElement(name) {
      if (emitted.pop()) session.response.write(`</${name}>`);
    },

    onError(error) {
      if (!session.response.writableEnded) session.response.destroy(error);
    },

    onEnd() {
      if (!session.response.writableEnded) session.response.end();
    }
  });

  session.request.on("data",chunk => {
    try {
      parser.write(chunk);
    } catch (error) {
      if (!session.response.writableEnded) session.response.destroy(error);
    }
  });

  session.request.on("end",() => {
    try {
      parser.end();
    } catch (error) {
      if (!session.response.writableEnded) session.response.destroy(error);
    }
  });

  session.request.on("aborted",() => {
    if (!session.response.writableEnded) session.response.destroy();
  });
}
