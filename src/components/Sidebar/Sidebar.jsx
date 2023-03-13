import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import { useGetGenresQuery } from "../../services/TMDB";
import { useDispatch, useSelector } from "react-redux";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

const lightLogo = "https://iili.io/HXXDPoJ.png";
const darkLogo = "https://iili.io/HXXDgAF.png";
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = () => {
  const [selectedGenreOrCategory, setSelectedGenreOrCategory] = useState();
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const handleGenreOrCategoryClick = (value) => {
    setSelectedGenreOrCategory(value);
    dispatch(selectGenreOrCategory(value));
  };

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? lightLogo : darkLogo}
          alt="cinemeow logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader
          style={{ fontFamily: "sora, sans-serif", fontSize: "0.8rem" }}
        >
          Cat-egories
        </ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton
              selected={genreIdOrCategoryName === value}
              onClick={() => handleGenreOrCategoryClick(value)}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={label}
                className={classes.categoryText}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader
          style={{ fontFamily: "sora, sans-serif", fontSize: "0.8rem" }}
        >
          Genres
        </ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItemButton
                selected={genreIdOrCategoryName === id}
                onClick={() => handleGenreOrCategoryClick(id)}
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={name}
                  className={classes.genreText}
                />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
