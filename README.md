# tinyroster

A simple AMS service for student organizations to manage their members and events. Everything you need and nothing you don't.

# Development notes

## API test panel

Visit /api/panel to view a fully functional API test panel generated with [trpc-panel](https://github.com/iway1/trpc-panel). You must be signed in to an account to use it properly, or else the middleware will reject your requests.

## Calling the API

All api functions are exported both from /trpc/react and /trpc/server. Any code called on the frontend should be imported from /trpc/react, and any code called on the backend should be imported from /trpc/server.
