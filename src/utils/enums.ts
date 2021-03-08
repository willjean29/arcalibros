export enum UserType {
  TEACHER = 1,
  STUDENT = 0,
}

export enum SocketEvent {
  //SOCKETS
  Connection = "connection",
  Disconnect = "disconnect",
  Connect = "connect",
  UserLogin = "userLogin",
  UserDisconnect = "userDisconnect",
  //MESSAGES
  SuscribeToMessages = "suscribeUserToMessages",
  MessageFromServer = "messageToClient",
  MessageEvaluationFromServer = "messageEvaluationToClient",
  //USER
  ClassroomToStudent = "classroomToStudent",
  ConnectedUsersFromServer = "connectedUsersFromServer",
  UserAlreadyConnected = "userAlreadyConnected",
  //CLASSROOMS
  SuscribeToClassroom = "suscribeUserToClassroom",
  LeaveUserFromClassroom = "leaveUserFromClassroom",
  ClassroomFromServer = "classroomToClient",
  ConnectedUsersClassroom = "connectedUsersClassroom",
  BannedStudentToClient = "bannedStudentToClient",
  //TOPICS
  SuscribeToTopic = "suscribeUserToTopic",
  TopicFromServer = "topicToClient",
  //CLOCK
  ClockFromServer = "clockFromServer",
  //EXAMCLASSROOM
  ExamClassroomStart = "examClassroomStart",
  ExamClassroomFinish = "examClassroomFinish",
  ExamClassroomDeleted = "examClassroomDeletedToClient",
}

export enum SidebarItem {
  Home = "Home",
  Classrooms = "Classrooms",
  Books = "Books",
  Broadcast = "Broadcast",
  Messages = "Messages",
  Exercises = "Exercises",
  Evaluations = "Evaluations",
  ArcaExercises = "ArcaExercises",
  Whiteboard = "Whiteboard",
}

export enum MessageItem {
  Received = "Recibidos",
  Sended = "Enviados",
  Homework = "Evaluaciones",
}

export enum Course {
  COMPUTACION = "Computacion",
  ARTE = "Arte",
  PERSONAL_SOCIAL = "Personal Social",
  MATEMATICA = "Matematica",
  COMUNICACION = "Comunicacion",
  CTA = "Ciencia y Tecnologia",
  INGLES = "Ingles",
  INNOVACION = "Innovacion y Emprendimiento",
}

export enum Level {
  INICIAL = "Inicial",
  PRIMARIA = "Primaria",
  SECUNDARIA = "Secundaria",
}

export enum Color {
  VIOLET = "violet",
  RED = "red",
  YELLOW = "yellow",
  GREEN = "green",
  SKYBLUE = "skyblue",
  PINK = "pink",
  BLUE = "blue",
}

export enum ExcerciseType {
  SELECTION = 1,
  DRAGDROP = 2,
  FILLBLANK = 3,
  SELECTION_IMAGES = 4,
}
