import React, { useEffect, useState } from "react";
import { getAllNotification } from "../../api/notification";
import { Link } from "react-router-dom";
import { timeCal } from "../../Utils/DateFormat";
import { getDoctorId } from "../../Utils/Storage";

const Notifications = () => {
  const [notification, setNotification] = useState([]);
  const [count, setCount] = useState("");
  const [scroll, setScroll] = useState(false);
  const [next, setNext] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getNotificationList();
  }, [next]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  const handleScroll = () => {
    const value =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200;
    setScroll(value);
  };
  useEffect(() => {
    if (scroll) {
      loadMoreNotification();
    }
  }, [scroll]);

  const getNotificationList = () => {
    const findData = {
      limit: 10,
      page: next,
      to: getDoctorId(),
    };

    getAllNotification(findData)
      .then((res) => {
        console.log("sarath", res);
        const filteredNotifications = res?.data?.result.filter(
          (item) => item.to.user === getDoctorId()
        );
        setNotification(filteredNotifications);
      })
      .catch((err) => console.log(err));
  };

  const loadMoreNotification = () => {
    let nextNotification = next;
    nextNotification = nextNotification + 10;
    if (count <= nextNotification) {
      setReload(true);
    } else {
      setNext(nextNotification);
    }
  };

  return (
    <>
      <div className="col-lg-12 scroll-bar">
        <div className=" mb-2">
          <div className="">
            {notification.map((data, index) => (
              <div
                key={index}
                className="row-col-lg-3 mb-3 d-flex align-items-center gap-2"
              >
                <div className="col-lg-2 col-md-1 col-2">
                  <img
                    className="img-fluid rounded-circle"
                    src={
                      data?.from?.user?.profileImage ??
                      "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                    }
                    alt="avatar"
                    style={{
                      width: "3rem",
                      height: "3rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-lg-10 col-md-9 col-8 text-start">
                  <span className="fw-bolder">
                    <Link to="/" className="text-decoration-none text-dark">
                      {data?.from?.user?.name}
                    </Link>
                  </span>
                  <br />
                  <small className="text-secondary d-block">
                    {data?.description}
                  </small>
                  <small className="text-secondary d-block">
                    {timeCal(data?.date)}
                  </small>
                </div>
              </div>
            ))}
            {reload && notification.length > 0 ? (
              <div className="form-text text-danger text-center">
                The notification has ended.
              </div>
            ) : null}
            {notification.length === 0 ? (
              <div className="form-text text-danger text-center">
                Notifications aren't there.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
