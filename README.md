# Artventures Website & Webapp

[![Artventures Status](https://api.netlify.com/api/v1/badges/537af7ed-704d-4057-9cbd-1b727804cfbe/deploy-status)](https://app.netlify.com/sites/flamboyant-stonebraker-6fe6d3/deploys)

### 1. Tools

1. __Jamstack framework__: `Gridsome`
2. __Jamstack BaaS__: `Netlify`
3. __UI Library__: `Vuetify`
4. __CMS__: `Netlify CMS`
5. __Auth Service__: `Auth0`
6. __Marketing Service__: `Mailchimp`
7. __Image DB__: `Cloudinary`

### 2. Configure Project

1. Clone project
2. Go to path via command line
3. Run `yarn install` to install all node modules

### 3. Integrate with Netlify for local deployment
1. netlify CLI already installed
2. Simply run `netlify dev` in command line to locally test site generator, API integrations, serverless functions.

### 4. Local development

1. Instead of `gridsome develop` run `netlify dev` as stated.
2. The default port will be 8888, as such by default the local deployment is at `localhost:8888`.
2. Happy coding 🎉🙌
 

### 5. Create .env.development for local environment variables

1. `GRIDSOME_BUILD`
2. `GRIDSOME_SITE_URL`
3. `GRIDSOME_AUTH0_CLIENT_ID`
4. `GRIDSOME_AUTH0_CLIENT_SECRET`
5. `GRIDSOME_AUTH0_MANAGEMENT_API_TOKEN`
