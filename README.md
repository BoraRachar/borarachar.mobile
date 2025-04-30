# Welcome to "Bora Rachar" app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

 
Generate the .env.local file that looks like this

3. Login to eas
   ```bash
   eas login
   ```
  
4. Choose between `development`, `preview` or `production` env
   ```bash
   eas env:pull
   
   OU
   
   eas env:pull development
   ``` 

# Update EAS build
```bash
eas update -p android --environment development --channel development
```
change `development` to `preview`or `production`