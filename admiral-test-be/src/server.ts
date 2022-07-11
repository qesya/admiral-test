import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { defs, resolvers } from './graphql';

const port = 4000;
const uri = 'mongodb+srv://pasqualepalena:t8zKVagHvJw55xIQ@admiral-test.lx6bdsk.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(
	cors({
		origin: '*',
	})
);
const httpServer = http.createServer(app);

const loadTypeDefs = Object.values(defs).map((x) => x);
const loadResolvers = Object.values(resolvers).map((x) => x);

const createApolloServer = async () => {
	const apolloServer = new ApolloServer({
		schema: makeExecutableSchema({
			typeDefs: mergeTypeDefs(loadTypeDefs),
			resolvers: mergeResolvers(loadResolvers),
		}),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app, path: '/graphql' });

	await mongoose.connect(uri);

	httpServer.listen(port, () => {
		console.log(`🚀 Graphql is ready at http://localhost:${port}/graphql`);
	});
};

createApolloServer();
