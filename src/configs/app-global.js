// project settings, you can change only PROJECT_NAME, BASE_URL and WEBSITE_URL otherwise it can break the app
export const PROJECT_NAME = 'KasiDel marketplace';
export const BASE_URL =
  process.env.REACT_APP_BASE_URL || 'https://api.kasidelmarketplace.co.za';
export const WEBSITE_URL = 'https://kasidelmarketplace.co.za';
export const api_url = BASE_URL + '/api/v1/';
export const api_url_admin = BASE_URL + '/api/v1/dashboard/admin/';
export const api_url_admin_dashboard = BASE_URL + '/api/v1/dashboard/';
export const IMG_URL = '';
export const export_url = BASE_URL + '/storage/';
export const example = BASE_URL + '/';

// map api key, ypu can get it from https://console.cloud.google.com/apis/library
export const MAP_API_KEY = 'AIzaSyB-_Fyqw7FJJxTpt7MjwYvuUZJQa065tTs';

// firebase keys, do not forget to change to your own keys here and in file public/firebase-messaging-sw.js
export const VAPID_KEY =
  'BPZxZhfHbVPabsocDnutgiz55QQeBbgBrabmUTeg-72ZjEpq4Z9nw3UADwQ5i0S1jNWtgBAL3EQXA8CZBJXWUC8';
export const API_KEY = 'AIzaSyC7sJztdLGUDeaVRp4JzGQqkd1SAl8Mxzw';
export const AUTH_DOMAIN = 'kasidel-marketplace.firebaseapp.com';
export const PROJECT_ID = 'kasidel-marketplace';
export const STORAGE_BUCKET = 'kasidel-marketplace.firebasestorage.app';
export const MESSAGING_SENDER_ID = '518855117785';
export const APP_ID = '1:518855117785:web:1e71b2c48a9271fc5367c8';
export const MEASUREMENT_ID = 'G-B1SV1XH8GH';

// recaptcha key, you can get it from https://www.google.com/recaptcha/admin/create
export const RECAPTCHASITEKEY = '6LdYojEqAAAAAFEACPmNtOnHgukxE2S7D8oo1tiQ';

// demo data, no need to change
export const LAT = -24.944727;
export const LNG = 29.183784;
export const DEMO_SELLER = 334; // seller_id
export const DEMO_SELLER_UUID = '3566bdf6-3a09-4488-8269-70a19f871bd0'; // seller_id
export const DEMO_SHOP = 599; // seller_id
export const DEMO_DELIVERYMAN = 375; // deliveryman_id
export const DEMO_MANEGER = 114; // deliveryman_id
export const DEMO_MODERATOR = 297; // deliveryman_id
export const DEMO_ADMIN = 107; // deliveryman_id
export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/svg',
];
