import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepo } from "../../redux/actions/profile.action";
import Spinner from "../layouts/spinner";

const ProfileGithub = ({
  githubusername,
  getGithubRepo,
  profile: { repos, loading },
}) => {
  useEffect(() => {
    if (githubusername) {
      getGithubRepo(githubusername);
    }
  }, [getGithubRepo, githubusername]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos.length === 0 || loading ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              <p>
                { repo.description }
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_count} </li>
                <li className="badge badge-dark">Watchers: {repo.watchers_count} </li>
                <li className="badge badge-light">Forks: {repo.forks_count} </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  githubusername: PropTypes.string,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getGithubRepo })(ProfileGithub);
