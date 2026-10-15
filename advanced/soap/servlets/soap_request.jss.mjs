/*
 * JavaScript Servlet for Achieve
 * https://www.npmjs.com/package/achieve
 *
 * Achieve invokes servlet(session) when the
 * corresponding URL is requested.
 */
'use strict';

import soap from 'soap';

const soapPort = Number(process.env.ACHIEVE_EXAMPLES_SECONDARY_PORT || 8990);

export async function servlet(session) {
  const client = await soap.createClientAsync(`http://localhost:${soapPort}/soap?wsdl`);
  const [result] = await client.GetPriceAsync({productId:"bk101"});

  session.response.setHeader("Content-Type","application/json;charset=utf-8");
  return JSON.stringify(result);
}
