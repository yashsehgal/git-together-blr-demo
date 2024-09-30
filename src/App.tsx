import { GitHubProfile } from "./components";
import { useGitHub } from "use-github-react/dist/use-github";
import { GITHUB_PERSONAL_ACCESS_TOKEN } from "./utils";
import {
  IGitHubRepo,
  IGitHubUserInfo,
  LanguageDistribution,
} from "use-github-react/dist/use-github/interfaces/global";

const DEMO_USERNAME: string = "yashsehgal" as const;

export default function App() {
  const { userInfo, getRepositories } = useGitHub({
    username: DEMO_USERNAME,
    personalAccessToken: GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const user: IGitHubUserInfo = userInfo as IGitHubUserInfo;
  const pinnedRepos: IGitHubRepo[] = getRepositories().pinned();
  const languageDistribution: LanguageDistribution[] =
    getRepositories().all.languageDistribution();

  return (
    <GitHubProfile.Card>
      <GitHubProfile.Header user={user} />
      <GitHubProfile.PinnedRepositories repos={pinnedRepos} />
      <GitHubProfile.LanguageDistribution
        languageDistribution={languageDistribution}
      />
    </GitHubProfile.Card>
  );
}
