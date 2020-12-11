export interface JwtInterface extends JwtHeaderInterface {
  blabla: any;
}

interface JwtHeaderInterface {
  alg: string;
  typ: string;
}
