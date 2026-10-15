# Achieve examples

## How requests reach JavaScript Servlets

Achieve provides the HTTP server, request handling, URL mapping, and servlet
invocation. Application developers place servlet files in the configured
application directory and export a `servlet(session)` function; Achieve invokes
that function when the corresponding URL is requested.

For example, the beginner startup application contains
`basics/startup/application/servlets/hello.jss`. The source-checkout launchers
configure this entire repository as the application directory. After installing
the dependencies as described below, run `node start-xml.mjs` from the adjacent
`achieve` repository; requesting
`http://localhost:8989/basics/startup/application/servlets/hello.jss` then
invokes the servlet. The file exports its handler with `exports.servlet`.
Application logic can use ordinary Node.js modules and installed npm packages.
Achieve already supplies the HTTP server, request processing, and routing used
by these examples, so an additional HTTP framework is unnecessary.

The examples are a separate application package. From this directory, install
the dependencies used directly by the example application code:

```bash
npm install
```

Achieve and its startup dependencies are installed in the adjacent `achieve`
repository. Change to that directory and start one Advanced demonstration at a
time with Node:

```bash
cd ..\achieve
node start-mysql.mjs
node start-websockets.mjs
node start-cluster.mjs
node start-xml.mjs
node start-distributed.mjs
node start-soap.mjs
```

Open the demonstration at the URL printed below. The normal URL is the
matching page under `http://localhost:8989/advanced/`.

| Demonstration | Page | Additional requirement |
| --- | --- | --- |
| MySQL | `/advanced/mysql/` | A MySQL-compatible server and the database described in `advanced/mysql/setup.sql`; set the credentials in both MySQL servlets. |
| WebSockets | `/advanced/websockets/` | None beyond the installations in `achieve` and `achieve_examples`. |
| Cluster | `/advanced/cluster/` | Starts a single-process server on 8989 and clustered workers on 8990. |
| XML-SAX | `/advanced/xml/` | None beyond the installation in `achieve_examples`. |
| Distributed | `/advanced/distributed/` | Starts two independent Achieve servers on ports 8989 and 8990. |
| SOAP | `/advanced/soap/` | Starts Achieve on 8989 and the demonstration SOAP service on 8990. |

Only one demonstration should be started at a time because the commands reuse
ports 8989 and, where needed, 8990. Stop a demonstration with Ctrl-C before
starting another.

The Node.js built-ins used by these demonstrations—such as `node:cluster`,
`node:http`, `node:fs`, `node:path`, `node:os`, and `node:child_process`—do not
need npm dependencies.

The startup modules in the adjacent `achieve` repository serve this application
directory through `setAppPath()`. Achieve resolves itself by package
self-reference, while server-side startup packages resolve from the Achieve
installation. To serve a relocated application tree, set
`ACHIEVE_EXAMPLES_PATH` to its absolute path before starting a demonstration.
