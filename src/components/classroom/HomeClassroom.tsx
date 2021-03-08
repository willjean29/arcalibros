import React, { useEffect, useState } from "react";
import CardButtonModal from "../button/CardButtonModal";
import InfoClassroom from "./InfoClassroom";
import PostCard from "./PostCard";
import PostField from "./PostField";
import RemoteClass from "./RemoteClass";

import imgUser from "../../assets/images/user.png";
import imgParticipants from "../../assets/images/addStudent.png";
import Modal from "../modal/Modal";
import ModalAddStudent from "../modal/ModalAddStudent";
import { RootStore } from "../../store/store";
import { useSelector } from "react-redux";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import Loading from "../loading/Loading";
import { Teacher } from "../../store/user/interfaces/teacher.interface";
import { UserType } from "../../utils/enums";
import { ClassroomComment } from "../../store/classroom/interfaces/classroom-comment.interface";
import ModalDeleteClassroom from "../modal/ModalDeleteClassroom";
import SchoolLogo from "../home/SchoolLogo";
import ModalEditClassroom from "../modal/ModalEditClassroom";
import Birthday from "../events/Birthday";
import { ClassroomEvent } from "../../store/classroom/interfaces/classroom-events.interface";
import moment from 'moment'
const HomeClassroom = () => {
  const [modalDeleteClassroom, setModalDeleteClassroom] = useState(false);
  const [modalAddStudent, setModalAddStudent] = useState(false);
  const [modalEditClassroom, setModalEditClassroom] = useState(false);
  
  const day = moment().date();
  const momentMonth = moment().month() + 1;
  let month = momentMonth < 10 ? `0${momentMonth}` : momentMonth;

  const classroom = useSelector(
    (state: RootStore) => state.classroom.selectedClassroom
  ) as Classroom;
  const [comments, setComments] = useState([] as ClassroomComment[]);
  const user = useSelector((state: RootStore) => state.user.user);
  const userType = useSelector(
    (state: RootStore) => state.user.user?.type as number
  );
  // const userBirthday = useSelector(
  //   (state: RootStore) => state.user.user?.birthday as string
  // );

  useEffect(() => {
    if (classroom) {
      setComments(classroom.comments.reverse());
    }
    return () => {
      if (classroom) {
        setComments(classroom.comments.reverse());
      }
    };
  }, [classroom]);

  // const calcBirthday = () => {
  //   const myDay =  userBirthday.split('/')[1];
  //   const myMonth =  userBirthday.split('/')[0];
    
  //   if(myDay === day.toString() && myMonth === month.toString()){
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  return !classroom ? (
    <Loading />
  ) : (
    <>
      <Modal modalOpen={modalDeleteClassroom}>
        <ModalDeleteClassroom setModalOpen={setModalDeleteClassroom} />
      </Modal>
      <Modal modalOpen={modalEditClassroom}>
        <ModalEditClassroom setModalOpen={setModalEditClassroom} />
      </Modal>
      <Modal modalOpen={modalAddStudent}>
        <ModalAddStudent
          setModalOpen={setModalAddStudent}
          classroomId={classroom._id as string}
          teacherEmail={user?.email as string}
          teacherName={(user?.firstName as string).concat(" " + user?.lastName)}
          course={classroom.course}
          grade={classroom.grade}
          section={classroom.section}
        />
      </Modal>

      <InfoClassroom
        setModalOpen={setModalDeleteClassroom}
        setModalOpenEdit={setModalEditClassroom}
        classroom={classroom}
      />
      {userType === UserType.TEACHER ? (
        <div className="two-components-ls">
          <RemoteClass />
          <CardButtonModal
            setModalOpen={setModalAddStudent}
            imgCard={imgParticipants}
            title="Añadir alumno"
            description="Participa en las clases virtuales"
          />
        </div>
      ) : (
        <div className="two-components-logo">
          <RemoteClass />
          <SchoolLogo />
        </div>
      )}

      {/* {
        calcBirthday() && (
          <Birthday />   
        )
      } */}


      <PostField imgUser={imgUser} classroomId={classroom._id!} />
      {comments &&
        comments.map((comment, index) => (
          <PostCard
            classroomId={classroom._id as string}
            key={index}
            imgUser={imgUser}
            message={comment.comment}
            name={comment.name}
            course={classroom.course}
            type={comment.type === UserType.TEACHER ? "Profesor" : "Alumno"}
            date={comment.date}
            profileImg={comment.profileImg}
            file={comment.file}
            link={comment.link}
            comment={comment}
          />
        ))}
    </>
  );
};

export default HomeClassroom;
