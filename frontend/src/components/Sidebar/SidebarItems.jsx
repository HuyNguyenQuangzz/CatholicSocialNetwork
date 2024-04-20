import CreatePost from "./CreatePost";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Chat from "./Chat";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Chat />
      <CreatePost />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
