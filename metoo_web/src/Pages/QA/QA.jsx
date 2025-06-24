import React, { useEffect, useState } from "react";
import "./QA.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { askquestion, getAllUserQuestion } from "../../Api/faq";
import { getDoctorId, getUserId } from "../../Utils/Storage";
import { useNavigate } from "react-router-dom";
import { getsingleuser } from "../../Api/user";

const QA = () => {
  const navigate = useNavigate();

  const initialState = {
    userId: getUserId(),
    doctorIds: getDoctorId(),
    question: " ",
    answers: " ",
  };

  const initialStateErrors = {
    question: { required: false },
    answers: { required: false },
  };

  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.question === "") {
      error.question.required = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {
      getAllUserQuestion()
        .then((res) => {
          const userQuestions = res?.data?.result.filter(
            (item) => item.userId?._id === getUserId()
          );

          if (userQuestions && userQuestions.length > 0) {
            navigate(`/PaymentPage`);
          } else {
            askquestion(inputs)
              .then((res) => {
                setInputs(initialState);
                setSubmitted(false);
                getUserQuestion();
                getUserDetails();
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getUserQuestion();
  }, []);

  const getUserQuestion = () => {
    getAllUserQuestion()
      .then((res) => {
        const filteredUserQuestions = res?.data?.result.filter(
          (item) => item.userId?._id === getUserId()
        );
        setQuestions(filteredUserQuestions);
      })
      .catch((err) => console.log(err));
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    const id = getUserId();
    getsingleuser(id)
      .then((res) => {
        setUser(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [docAnswers, setDocAnswers] = useState([]);

  useEffect(() => {
    getDoctorAnswers();
  }, []);

  const getDoctorAnswers = () => {
    getAllUserQuestion()
      .then((res) => {
        const filteredDoctorAnswers = res?.data?.result.filter(
          (item) => item.userId?._id === getUserId()
        );
        setDocAnswers(filteredDoctorAnswers);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <body className="q_and_a_page mb-4 y-5 ">
        <div className="q_and_a_bg container-fluid">
          <div className="container ">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center q_and_a_content">
                <div className="mt-5 pt-4">
                  <p className="display-5 text-qa">HAVE A QUESTION?</p>
                  <p className="fw-bold text-qa">
                    Got a question? Our doctors are here to help! Whether it's
                    about a medical condition, health advice, or just general
                    curiosity, ask away. We're committed to providing reliable
                    answers and support tailored to you. Your health is our
                    priority!
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3 fotcolo_change">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Ask your question here..."
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      value={inputs.question}
                      name="question"
                      onChange={handleInputs}
                    />
                    <button className="btn" type="submit" id="button-addon1">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          {questions.map((q, index) => (
            <div className="row py-2 ">
              <div className="col-md-6    ">
                <img
                  src={user?.profileImage}
                  alt="profile"
                  data-bs-toggle="popover"
                  data-bs-content="This is a popover content."
                  className="image-fluid rounded-circle"
                  id="profile_img_size"
                />
                <span key={index} className="px-2">
                  {q.question}
                </span>
              </div>
            </div>
          ))}

          {docAnswers.map((ans, index) => (
            <div className="row justify-content-end mb-3" key={index}>
              <div className="col-md-6  text-end  ">
                {ans.answers.map((answerItem, answerIndex) => {
                  const doctor = ans.doctorIds.find(
                    (doc) => doc._id === answerItem.doctorId
                  );

                  if (doctor) {
                    return (
                      <div key={answerIndex}>
                        <span className="px-3">{answerItem.answer}</span>
                        <img
                          src={doctor.profileImage}
                          alt="profile"
                          data-bs-toggle="popover"
                          data-bs-content="This is a popover content."
                          className="image-fluid rounded-circle mb-2"
                          id="profile_img_size"
                        />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </body>
      <Footer />
    </div>
  );
};

export default QA;
