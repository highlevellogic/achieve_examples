From the adjacent Achieve repository, run node start-cors.mjs.
Open http://localhost:8990/intermediate/cors/public/

Then 8990 will try to fetch resources with url: http://localhost:8989 ...

Set
allowOrigins("http://localhost:8990", "intermediate/cors/public/"); to give localhost:8990 access to the example public directory.
This also gives access to subdirectory intermediate/cors/public/frameworks/

Then reset to
allowOrigins("http://localhost:8990", "intermediate/cors/public/frameworks/");
This only allows access to intermediate/cors/public/frameworks/
