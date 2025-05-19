import {
	GetSecretValueCommand,
	GetSecretValueCommandOutput,
	SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import "dotenv/config";

const profile = process.env.AWS_PROFILE;

const client = new SecretsManagerClient({
	region: "us-west-2",
	credentials: fromIni({ profile: profile }),
});

const params = {
	SecretId: process.env.SECRET_NAME,
};

export let response: GetSecretValueCommandOutput;

try {
	response = await client.send(new GetSecretValueCommand(params));
} catch (err: unknown) {
	console.log("error", err);
}

