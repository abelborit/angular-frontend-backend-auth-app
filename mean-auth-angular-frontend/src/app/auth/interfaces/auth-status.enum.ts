/* esto mismo en vez de hacerlo con enum también se puede trabajar con type, son solo diferentes formas de hacerlo */

/* si se deja así entonces a checking le colocará como 0, a authenticated como 1 y notAuthenticated como 2 pero hacerlo de esa forma es muy volatil ya que si se cambia el orden entonces podría romper el código, por eso es que a cada propiedad se le igualará a su mismos nombre como lo usamos abajo */
// export enum AuthStatus {
//   checking, // 0
//   authenticated, // 1
//   notAuthenticated, // 2
// }

/* igualando cada propiedad a su mismo nombre */
export enum AuthStatus {
  checking = 'checking',
  authenticated = 'authenticated',
  notAuthenticated = 'notAuthenticated',
}
