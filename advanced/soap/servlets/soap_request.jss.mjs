'use strict';

import soap from 'soap';

const soapPort = Number(process.env.ACHIEVE_EXAMPLES_SECONDARY_PORT || 8990);

export async function servlet(session) {

session.autoEnd = false;

try {
  const client = await soap.createClientAsync(`http://localhost:${soapPort}/soap?wsdl`);
  const [result] = await client.GetPriceAsync({productId:"bk101"});

  session.response.setHeader("Content-Type","application/json;charset=utf-8");
  session.response.end(JSON.stringify(result));
} catch (err) {
  session.response.statusCode = 500;
  session.response.end(err.message);
}

}
