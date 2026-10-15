# Achieve examples

Achieve is a developer-friendly HTTP server and HTTP application server for
Node.js. It supplies the listener, HTTP request handling, URL mapping, static
resource handling, and JavaScript Servlet invocation for an application.

Learn the programming model from the beginner examples before adapting an
advanced demonstration. The simplest complete starting point is
`basics/startup/application/`, whose servlet is
`basics/startup/application/servlets/hello.jss`.

In the source checkout, the launchers in the adjacent `achieve` repository
configure this entire `achieve_examples` repository as the application space.
Start the example with:

```text
npm install
cd ..\achieve
node start-xml.mjs
```

Then a request for
`http://localhost:8989/basics/startup/application/servlets/hello.jss` invokes
that servlet. Its path below the configured application root becomes its URL.

The servlet uses CommonJS and exports the entry point with `exports.servlet`:

```js
exports.servlet = function () {
    return "Hello from the Startup example servlet.";
};
```

The startup module is an ES module. Achieve invokes the exported servlet as
`servlet(session)`. This servlet omits the argument because it needs no request
information; servlets that need it declare and use `session`.

Servlet paths are resolved within the configured application directory. Keep
public resources and servlet files there, and set the application path before
starting the listener as the existing startup modules do.

Application functionality can use ordinary Node.js built-ins and installed npm
packages. The advanced examples show servlets integrating MySQL, WebSockets,
XML/SAX processing, distributed work, clustering, and SOAP services.

Preserve Achieve's direct programming model when extending these examples.
Achieve already provides their HTTP and routing infrastructure, so adding
Express, a middleware stack, or another routing framework is unnecessary.

Achieve package: https://www.npmjs.com/package/achieve

Documentation: https://highlevellogic.github.io/achieve/index.htm
