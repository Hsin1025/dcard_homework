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
            token.accessToken = account.access_token;
            token.id = profile.id;
          };
          console.log(token);
          return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.error = token.error;
            console.log('session', session)
            return session;
        },
    },
};

const auth = (req, res) => NextAuth(req, res, options);
export default auth;