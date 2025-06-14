/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "../components/Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "../components/Message.jsx";

export default function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
