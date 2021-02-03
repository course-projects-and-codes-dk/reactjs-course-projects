import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  // get data from context
  const { repos } = React.useContext(GithubContext);

  // get count of languages used
  let languages = repos.reduce((total, repo) => {
    const { language, stargazers_count } = repo;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  // convert the object into an array
  languages = Object.values(languages);

  // sort and get only 6 value of most used language
  const mostUsed = languages.sort((a, b) => b.value - a.value).slice(0, 6);

  // sort and get most starred language
  const mostStarred = languages
    .sort((a, b) => b.stars - a.stars)
    // since chart looks for value property, set stars as value
    .map((item) => {
      return {
        ...item,
        value: item.stars,
      };
    })
    .slice(0, 6);

  // data for forks and stars
  let { stars, forks } = repos.reduce(
    (total, item) => {
      // destructure properties from repo
      const { stargazers_count, name, forks } = item;
      // set properties to total array
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  // get last 5 values of in reversed form
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  // const chartData = [
  //   {
  //     label: 'html',
  //     value: '100',
  //   },
  //   {
  //     label: 'css',
  //     value: '220',
  //   },
  //   {
  //     label: 'js',
  //     value: '180',
  //   },
  // ];

  // jsx
  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} /> */}
        {/* pie */}
        <Pie3D data={mostUsed} />
        {/* column */}
        <Column3D data={stars} />
        {/* doughnut */}
        <Doughnut2D data={mostStarred} />
        {/* bar */}
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

// styled components
const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
