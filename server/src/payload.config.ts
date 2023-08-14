import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Operations from './collections/operations.group/Operations'
import Categories from './collections/operations.group/Categories'
import Places from './collections/operations.group/Places'
import Currencies from './collections/accounts.group/Currencies'
import Accounts from './collections/accounts.group/Accounts'
import CryptoCurrencies from './collections/accounts.group/CryptoCurrencies'
import Banks from './collections/accounts.group/Banks'

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [Users, Accounts, Banks, Currencies, CryptoCurrencies, Operations, Categories, Places],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [...(process.env.ORIGINS?.split(',') || [])],
})
