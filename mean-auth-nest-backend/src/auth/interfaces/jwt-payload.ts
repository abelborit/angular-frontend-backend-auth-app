export interface JwtPayload {
  /* el id siempre tiene que venir porque con el id ya se sabe qué usuario es y no importa si otra persona sabe qué usuario es otra persona porque ese id se va a reconstruir únicamente si la firma del JWT fue firmada por el backend */
  id: string;
  /* iat es la fecha de creación del JWT */
  iat?: number;
  /* exp es la fecha de expiración del JWT */
  exp?: number;
}
