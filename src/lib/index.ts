import { WebUntisQR } from "webuntis";
import { authenticator as Authenticator } from 'otplib';
import { URL } from 'node:url';
import { config } from "dotenv";
config();

const qrData: string | undefined = process.env.UNTIS_QR;
if (!qrData) {
    throw new Error("Could not find UNTIS_QR in env.");
}

const untis = new WebUntisQR(qrData, '.403693', Authenticator, URL);
await untis.login();
export const loggedInUntis = untis;
