import { InjectionToken } from '@angular/core';


// Although the ApplicationConfig interface plays no role in dependency injection, 
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
    // Inseguro, estoy iría al back pero no va a haber
    client_secret;
    client_id;
    url_base_auth;
    url_base;
    redirect_uri;
    url_base_accounts;
    
  }
  
  // Configuration values for our app
  export const CONFIG: ApplicationConfig = {
    client_secret: 'T0xO4xO2dA5kM7rR5uN1yW3oF3sN0nX0oV7aD4qG4gY1nK5pR0',
    client_id: '980bee2e-3044-4c46-a3cf-eb69465ed719',
    url_base_auth: 'https://api-glbk.liberbank.es/tpps/sb/oauth2',
    url_base: 'https://api-glbk.liberbank.es/tpps/sb/psd2/v1.0',
    url_base_accounts: 'https://api-glbk.liberbank.es/tpps/sb/psd2/v1.0/accounts',
    redirect_uri: 'http://172.24.202.230:8100'

  };
  
  // Create a config token to avoid naming conflicts
  export const CONFIG_TOKEN = new InjectionToken('config');