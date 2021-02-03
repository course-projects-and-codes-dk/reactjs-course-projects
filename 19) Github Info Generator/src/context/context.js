import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

// context
const GithubContext = React.createContext();

// separate component
const GithubProvider = ({ children }) => {
  // data state values
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request left, error and loading states
  const [request, setRequest] = useState(0);
  const [error, setError] = useState({ show: false, msg: '' });
  const [loading, setLoading] = useState(false);

  // MAIN FUNCTION!!! - search user function
  const searchGithubUser = async (user) => {
    // 1) ---> set error to default
    toggleError();
    // 2) ---> show loading
    setLoading(true);
    // 3) ---> get response
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    // 4) ---> if response exists, handle it
    if (response) {
      // A) UPDATE USER
      setGithubUser(response.data);
      const { login, followers_url, repos_url } = response.data;
      // B) UPDATE REPOS & FOLLOWERS AT THE SAME TIME
      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          if (repos.status === 'fulfilled') {
            setRepos(repos.value.data);
          }
          if (followers.status === 'fulfilled') {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    }
    // 5) ---> if response doesn't exist, show error
    else {
      toggleError(true, `Oops! The user '${user}' doesn't exist.`);
    }
    // 6) ---> hide loading
    setLoading(false);
    // 7) ---> update requests left
    checkRequest();
  };

  // check requests left function
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(
        ({
          // destructure 3 levels
          data: {
            rate: { remaining },
          },
        }) => {
          setRequest(remaining);
          if (remaining === 0) {
            toggleError(
              true,
              `Sorry, you've exceeded your search requests for this hour :/`
            );
          }
        }
      )
      .catch((err) => console.log(err));
  };

  // handle error function
  const toggleError = (show = false, msg = '') => {
    setError({ show, msg });
  };

  // useEffect
  useEffect(checkRequest, []);

  // jsx
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
