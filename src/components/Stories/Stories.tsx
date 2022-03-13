import axios from "axios";
import "./stories.scss";
import { useEffect, useState } from "react";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";
import { StoryItem } from "../../models";
import storyImagePlaceholder from "../../assets/placeholder.webp";
import avatarPlaceholder from "../../assets/avatar.jpg";
import { formatDate } from "../../utils";

function Stories(): JSX.Element {
  const [list, setList] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function getStories(limit: number) {
    try {
      const topStoriesRequests = await axios.get(
        `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=${limit}&orderBy="$key"`
      );

      const storyRequests = topStoriesRequests.data.map(async (id: number) => {
        const items = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        );

        return items.data;
      });

      const storyResponse = await Promise.all(storyRequests);

      const data = storyResponse.map(async (item: StoryItem) => {
        const userRequests = await axios.get(
          `https://hacker-news.firebaseio.com/v0/user/${item.by}.json`
        );

        return {
          ...item,
          user: userRequests.data,
        };
      });

      const stories = await Promise.all(data);
      const storyItemsSorted = stories.sort((a, b) => b.score - a.score);

      setList(storyItemsSorted);
    } catch (err) {
      console.log("error: ", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStories(10);
  }, []);

  return (
    <>
      <div className="stories">
        <h2>Trending stories</h2>

        <ul className="stories__list">
          {!loading ? (
            list.map((item, index) => {
              const date = new Date(item.time);

              const formattedDate = formatDate(date);

              return (
                <li className="story__item" key={`trending-story-id-${index}`}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img src={storyImagePlaceholder} alt={item.title} />
                    <div className="story__item__inner">
                      <header>
                        <div>
                          <h3>
                            {item.title} <br />
                          </h3>
                          <time>{formattedDate}</time>
                        </div>
                        <h4 title={`Score ${item.score}`}>👏 {item.score}</h4>
                      </header>
                      <footer>
                        <div className="avatar" title={`User ${item.user.id}`}>
                          <img src={avatarPlaceholder} /> {item.user.id}
                        </div>
                        <p title={`Karma ${item.user.karma}`}>
                          ⭐ {item.user.karma}
                        </p>
                      </footer>
                    </div>
                  </a>
                </li>
              );
            })
          ) : (
            <Loader />
          )}
        </ul>
      </div>
    </>
  );
}

function Loader(): JSX.Element {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, index) => {
          return (
            <SkeletonLoader
              height={200}
              key={`trending-story-loader-id-${index}`}
            ></SkeletonLoader>
          );
        })}
    </>
  );
}

export default Stories;
