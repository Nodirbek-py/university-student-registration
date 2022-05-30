import { NhostClient } from "@nhost/nhost-js";

const client = new NhostClient({
  backendUrl: import.meta.env.VITE_BACKEND_URL,
});

const getStudents = async () => {
  const students = await client.graphql.request(`
query {
    students {
      branch
      full_name
      payment
      registration
      uid
      year
    }
  }
`);
  return !!students.error ? students.error : students.data;
};

const signIn = async (email: string, password: string) => {
  const auth = await client.auth.signIn({
    email: email,
    password: password,
  });
  return auth;
};

const getTypeOfUser = async () => {
  const type = await client.auth.getUser();
  return type;
};

const checkSign = async () => {
  const auth = await client.auth.isAuthenticatedAsync();
  return auth;
};

const getAccessToken = async () => {
  const token = await client.auth.getAccessToken();
  return token;
};

const logOut = async () => {
  const logout = await client.auth.signOut();
  return logout;
};

const getStudentsByFilter = async (
  payment?: boolean,
  registration?: boolean,
  year?: string,
  branch?: string,
) => {
  const students = await client.graphql.request(`
    query {
        students (where: {payment: {${
          payment !== undefined && { _eq: payment }
        }}, registration: {${
    registration !== undefined && { _eq: registration }
  }}, year: {${year !== undefined && { _eq: year }}}, branch: {${
    branch !== undefined && { _eq: branch }
  }}}) {
          branch
          full_name
          payment
          registration
          uid
          year
        }
      }
    `);
  return !!students.error ? students.error : students.data;
};

export {
  client,
  getStudents,
  getStudentsByFilter,
  signIn,
  getAccessToken,
  checkSign,
  getTypeOfUser,
  logOut,
};
