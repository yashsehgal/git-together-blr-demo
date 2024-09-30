import {
  IGitHubRepo,
  IGitHubUserInfo,
  LanguageDistribution,
} from "use-github-react/dist/use-github/interfaces/global";
import { motion } from "framer-motion";
import { IconBox } from "@tabler/icons-react";

function GitHubProfileCard(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, ...otherProps } = props;
  return (
    <div
      className="github-profile-card divide-y overflow-hidden rounded-lg bg-white w-[420px] border"
      {...otherProps}
    >
      <header className="github-profile-header bg-gray-50 text-neutral-500 text-xs p-2">
        GitHub Profile
      </header>
      <div className="github-profile-body-container divide-y">{children}</div>
    </div>
  );
}

function GitHubProfileHeader({ user }: { user: IGitHubUserInfo }) {
  if (!user) return null;
  return (
    <section className="github-profile-user-section p-4">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar_url}
          alt="profile"
          className="w-16 h-16 rounded-lg aspect-square"
        />
        <div className="github-profile-header__info">
          <h2 className="github-profile-header__name text-base font-medium">
            {user.name}
          </h2>
          <p className="github-profile-header__username text-sm text-gray-500">
            @{user.login}
          </p>
        </div>
      </div>
      {user.bio && <p className="text-xs mt-4 w-[80%] text-wrap">{user.bio}</p>}
    </section>
  );
}

function GitHubProfilePinnedRepositories({
  repos = [],
}: {
  repos: IGitHubRepo[];
}) {
  if (repos.length === 0) {
    return (
      <section className="p-4">
        <div className="github-profile-pinned-repos__empty h-24 w-full text-center text-gray-500 bg-gray-50 rounded-lg flex items-center justify-center text-sm">
          No pinned repositories
        </div>
      </section>
    );
  }

  return (
    <section className="p-4">
      <h3 className="mb-3 text-xs text-gray-500">Pinned repositories</h3>
      <div className="github-profile-pinned-repos grid grid-cols-2 gap-3">
        {repos.map((repo, index) => {
          return (
            <motion.button
              key={index}
              aria-label={repo.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-2 rounded-lg border hover:bg-gray-100"
              onClick={() => window.open(repo.html_url, "_blank")}
            >
              <IconBox size={14} strokeWidth={1.5} />
              <span className="text-xs font-medium truncate mr-2">
                {repo.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

function GitHubProfileLanguageDistribution({
  languageDistribution,
}: {
  languageDistribution: LanguageDistribution[];
}) {
  if (languageDistribution.length === 0) {
    return (
      <section className="p-4">
        <div className="github-profile-language-distribution__empty h-24 w-full text-center text-gray-500 bg-gray-50 rounded-lg flex items-center justify-center text-sm">
          No language distribution
        </div>
      </section>
    );
  }

  const total = languageDistribution.reduce(
    (sum, item) => sum + item.percentage,
    0
  );

  const getPercentageEmjoji = (percentage: number) => {
    if (percentage <= 20) return "🌱";
    if (percentage > 20 && percentage <= 40) return "🌳";
    if (percentage > 40 && percentage <= 60) return "🌲";
    if (percentage > 60 && percentage <= 80) return "🌴";
    if (percentage > 80 && percentage <= 100) return "🌵";
  };

  return (
    <section className="p-4 w-full max-h-[320px] overflow-y-scroll">
      <h3 className="mb-3 text-xs text-gray-500">Language distribution</h3>
      <div className="github-profile-language-distribution-wrapper space-y-2">
        {languageDistribution
          .sort((a, b) => b.percentage - a.percentage)
          .map(({ language, percentage }, index) => {
            const width = (percentage / total) * 600;
            const percentageValue = percentage * 100;
            return (
              <div
                className="w-full flex flex-col items-start gap-1"
                key={index}
              >
                <p className="text-xs uppercase">
                  {getPercentageEmjoji(percentageValue)} {language} -{" "}
                  {percentageValue.toPrecision(2)}%{" "}
                </p>
                <motion.div
                  className="h-4 rounded bg-blue-500"
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
}

export {
  GitHubProfileHeader as Header,
  GitHubProfilePinnedRepositories as PinnedRepositories,
  GitHubProfileCard as Card,
  GitHubProfileLanguageDistribution as LanguageDistribution,
};
