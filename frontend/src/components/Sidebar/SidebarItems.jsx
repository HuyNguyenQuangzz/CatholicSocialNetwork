import CreatePost from "./CreatePost";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Chat from "./Chat";
import Settings from "./Setting";
import Shopping from "./Shopping";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Chat />
      <CreatePost />
      <Shopping />
      <Settings />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
