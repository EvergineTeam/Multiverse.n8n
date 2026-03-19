import {
	type IAllExecuteFunctions,
	NodeConnectionTypes,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
	type ISupplyDataFunctions,
	type SupplyData,
} from 'n8n-workflow';
import { ChatOpenAI } from '@langchain/openai';

export class MultiverseCompactifAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Multiverse CompactifAi',
		name: 'multiverseCompactifAi',
		icon: {
			light: 'file:MultiverseCompactifAi.svg',
			dark: 'file:MultiverseCompactifAi.dark.svg',
		},
		group: ['transform'],
		version: 1,
		description: 'Use CompactifAi language models in your AI workflows',
		defaults: { name: 'Multiverse CompactifAi' },
		inputs: [],
		outputs: [NodeConnectionTypes.AiLanguageModel],
		outputNames: ['Model'],
		credentials: [{ name: 'multiverseCompactifaiApi', required: true }],
		properties: [
			{
				displayName: 'Model Name or ID',
				name: 'model',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getModels',
				},
				default: 'cai-llama-3-1-8b-slim',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Frequency Penalty',
						name: 'frequencyPenalty',
						type: 'number',
						default: 0,
						typeOptions: { minValue: -2, maxValue: 2, numberPrecision: 1 },
						description: 'Penalizes new tokens based on their existing frequency (-2 to 2)',
					},
					{
						displayName: 'Maximum Tokens',
						name: 'maxTokens',
						type: 'number',
						default: -1,
						typeOptions: { minValue: -1 },
						description: 'Maximum number of tokens to generate. Use -1 for no limit.',
					},
					{
						displayName: 'Temperature',
						name: 'temperature',
						type: 'number',
						default: 1,
						typeOptions: { minValue: 0, maxValue: 2, numberPrecision: 1 },
						description: 'Sampling temperature (0–2). Higher values make output more random.',
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getModels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this as unknown as IAllExecuteFunctions,
					'multiverseCompactifaiApi',
					{
					baseURL: 'https://api.compactif.ai/v1',
					method: 'GET',
					url: '/models',
						headers: {
							Accept: 'application/json',
						},
					},
				);

				const data = Array.isArray(response?.data) ? response.data : [];

				return data
					.map(
						(model: {
							id: string;
							owned_by?: string;
							parameters_number?: string;
						}) => ({
							name: `${model.id}${
								model.owned_by || model.parameters_number
									? ` (${[model.owned_by, model.parameters_number].filter(Boolean).join(', ')})`
									: ''
							}`,
							value: model.id,
						}),
					)
					.sort(
						(left: INodePropertyOptions, right: INodePropertyOptions) =>
							left.name.localeCompare(right.name),
					);
			},
		},
	};

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		const credentials = await this.getCredentials<{ accessToken: string }>(
			'multiverseCompactifaiApi',
		);
		const model = this.getNodeParameter('model', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex, {}) as {
			maxTokens?: number;
			temperature?: number;
			frequencyPenalty?: number;
		};

		const llm = new ChatOpenAI({
			apiKey: credentials.accessToken,
			modelName: model,
			temperature: options.temperature ?? 1,
			maxTokens: options.maxTokens === -1 ? undefined : options.maxTokens,
			frequencyPenalty: options.frequencyPenalty,
			configuration: {
				baseURL: 'https://api.compactif.ai/v1',
			},
		});

		return { response: llm };
	}
}
