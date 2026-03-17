import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';

export class MultiverseCompactifai implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Multiverse Compactifai',
		name: 'multiverseCompactifai',
		icon: { light: 'file:multiverseCompactifai.svg', dark: 'file:multiverseCompactifai.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Multiverse Compactifai API',
		defaults: {
			name: 'Multiverse Compactifai',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'multiverseCompactifaiApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.compactif.ai/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Company',
						value: 'company',
					},
				],
				default: 'user',
			},
			...userDescription,
			...companyDescription,
		],
	};
}
