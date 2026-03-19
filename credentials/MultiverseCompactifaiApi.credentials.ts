import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MultiverseCompactifaiApi implements ICredentialType {
	name = 'multiverseCompactifaiApi';

	displayName = 'Multiverse Compactifai API';

	icon: ICredentialType['icon'] = 'file:../nodes/MultiverseCompactifAi/MultiverseCompactifAi.svg';

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/@plainconcepts/-compactifai?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.compactif.ai/v1',
			url: '/models',
		},
	};
}
