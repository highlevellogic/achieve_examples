'use strict';

import soap from 'soap';

export async function servlet(session) {

session.allowAsync = true;

try {
  const client = await soap.createClientAsync("http://localhost:8990/soap?wsdl");
  const [result] = await client.GetPriceAsync({productId:"bk101"});

  session.response.setHeader("Content-Type","application/json;charset=utf-8");
  session.response.end(JSON.stringify(result));
} catch (err) {
  session.response.statusCode = 500;
  session.response.end(err.message);
}

}