import { facebookRequest } from '@/app/api';
import { ConnectAccountRequest } from '@/app/api/requests';
import { env } from '@/env';
import qs from 'query-string';

export function initFacebookSdk() {
  return new Promise<void>(() => {
    // Wait for facebook sdk to initialize before starting the react app
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: env.FACEBOOK_APP_ID,
        secret: env.FACEBOOK_SECRET_KEY,
        version: env.FACEBOOK_VERSION,
        cookie: false,
        xfbml: true,
      });

      // Auto authenticate with the api if already logged in with facebook
      window.FB.getLoginStatus(function (response: any) {
        statusChangeCallback(response);
      });
    };

    // Load facebook SDK script
    (function (document, script, id) {
      var jsScript: any,
        fbJsScript = document.getElementsByTagName(script)[0];
      if (document.getElementById(id)) {
        return;
      }
      jsScript = document.createElement(script);
      jsScript.id = id;
      jsScript.src = env.FACEBOOK_CONNECT_URL;
      if (fbJsScript.parentNode) {
        fbJsScript.parentNode.insertBefore(jsScript, fbJsScript);
      }
    })(document, 'script', 'facebook-jssdk');
  });
}

function statusChangeCallback(response: any) {
  if (response.status === 'connected') {
    // Logged into webpage and Facebook.
  } else {
    // Not logged into webpage
  }
}

export const loginFacebook = async () => {
  // Login with facebook then authenticate with the API to get a JWT auth token
  const params = new URLSearchParams();
  params.append('client_id', `${env.FACEBOOK_APP_ID}`);
  params.append('config_id', `${env.FACEBOOK_CONFIG_ID}`);
  params.append('redirect_uri', window.location.href);
  params.append('response_type', 'token');
  params.append('scopes', 'public_profile,email,pages_show_list,pages_read_engagement');
  window.location.assign(`${env.FACEBOOK_AUTH_URL}/${env.FACEBOOK_VERSION}/dialog/oauth?${params.toString()}`);
};

export const setTokenFacebook = async (hash: any) => {
  const parsed = qs.parse(hash);
  const accessToken = parsed['access_token'];
  const accessTokenExpireIn = parsed['data_access_expiration_time'];
  if (accessToken && accessTokenExpireIn) {
    const request: ConnectAccountRequest = {
      accessToken: accessToken as string,
      accessTokenExpireIn: Number(accessTokenExpireIn),
    };
    await facebookRequest.connectAccount(request);
    return Promise.resolve();
  }
};
