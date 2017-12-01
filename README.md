# cloudcms-example

## Instructions

- Install dependenices
- Add gitana.json with credentials
- Run app `node index.js`
- Request `/articles` with header key `Authorization` and json web token as value

## Goal

- Ensure that the jwt in header is valid
- No redirects. If token is invalid send status code 401.
- Protect routes with jwt
- Create a user / Login existing user in Cloudcms
- All subsequent operations in CloudCMS are authored by the logged in user (extracted from jwt)
- Ultimately create the flow described [here](https://www.cloudcms.com/documentation/appserver/appserver/services/auth/xauth-filters.png.pagespeed.ic.yt1BtSZHFo.png)

## JWT

The JWT we use is issued by Azure Active Directory and has the following structure:

```
{
  "aud": "",
  "iss": "",
  "iat": "",
  "nbf": "",
  "exp": "",
  "aio": "",
  "amr": [
    "pwd"
  ],
  "family_name": "",
  "given_name": "",
  "ipaddr": "",
  "name": "",
  "nonce": "",
  "oid": "",
  "onprem_sid": "",
  "sub": "",
  "tid": "",
  "unique_name": "",
  "upn": "",
  "uti": "",
  "ver": ""
}
```
We want to the `oid` field as key for the user. `family_name`, `given_name` and `email` should also be imported to the CloudCMS user.