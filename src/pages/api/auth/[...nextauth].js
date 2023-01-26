import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: { params: { scope: 'repo' } },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
            token.accessToken = account.access_token
            token.id = profile.id
        }
        console.log(token)
        return token
    }}
}

export default (req, res) => NextAuth(req, res, options)