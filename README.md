# Continuation Local Storage Example

This code was for education purposes during a presentation. It should in no way
be considered production ready.

## Try it out

Make sure you have a recent version of Node.js installed. LTS is fine.

```
git clone git@github.com:brentburg/cls-example.git
cd cls-example
npm install
npm start
```

Open `http://localhost:3000/the_life_of_pablo/yoda` with `curl` or your web
browser. Look back at console output.

## Fun (the jury is still out this) Translations API Key

I commited my API key. I paid $5 for that key so people may as well
use it before I cancel it.

## Why was it broken in the presentation? :facepalm:

Loading the `request` library before `async-hook` caused problems since the
patches were not loaded early enough. Thats all. :( On that note I need to issue
an apolgy to Kanye Rest. The timer wasn't stoped correctly so it wasn't as slow
as it appeared in the presentation. It is still kind of slow though.

## Licesne

¯\_(ツ)_/¯
