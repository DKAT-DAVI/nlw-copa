# Configure Back-end setup
## Node version
```
node -v
```
## NPM version**
```
npm -vl
```

## Using TypeScript
**Install**
```
npm i typescript -D
```
**Creating TypeScript setup**
```
npx tsc --init
```

## Using Fastify
**Install**
```
npm i fastify
```

### Automates code run and compilation
```
npm i tsx -D
```

## Run server
```
npm run dev
```
__Webadress__
http://localhost:3333/pools/count

## Using Prisma
**Install**
```
npm i prisma -D
```
**Interface**
```
npm i @prisma/client
```
**Configure SGBD**
```
npx prisma init --datasource-provider SQLite
```
**Update the database**
```
npx prisma migrate dev
```
**View database in an interface**
```
npx prisma studio
```
**Installing package to generate ERD**
```
npm i prisma-erd-generator @mermaid-js/mermaid-cli -D
```
**Creating ERD**
```
npx prisma generator
```
## Security settings
**Installing cors**
```
npm i @fastify/cors
```

# Configure Front-end setup

## Creating a React project using NextJS

```
npx  create-next-app@latest --use-npm
```

# Configure mobile setup
## Using expo-cli
**Creating a expo project**
```
npx create-expo-app nlwcopamobile
```
**Execute project**
```
npx expo start
```

## Using Native base
**Install dependencies**
```
npm install native-base
```
```
expo install react-native-svg@12.1.1
```
```
expo install react-native-safe-area-context@3.3.2
```
**Install font**
```
npx expo install expo-font @expo-google-fonts/roboto
```