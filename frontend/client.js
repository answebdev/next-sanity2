import { createClient } from '@sanity/client';

export default createClient({
    projectId: 't0g97kwz', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    apiVersion: '2021-08-31',
    useCdn: true // `false` if you want to ensure fresh data
});