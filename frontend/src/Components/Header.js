import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Route, withRouter } from "react-router-dom";

import { logout } from "../Actions/loginActions.js";
import "./Header.css";

const Header = ({ history }) => {
  const user_Login = useSelector((state) => state.userLogin);
  const { loading, error, user } = user_Login;
  const Cart = useSelector((state) => state.cart);
  const { cartItems } = Cart;
  const userCartItems = user
    ? cartItems.filter((item) => item.user_id === user._id)
    : [];
  const qty = userCartItems.reduce((acc, item) => (acc += item.qty), 0);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className="sticky">
      <div className="mb-5">
        <Navbar class="header" expand="lg" collapseOnSelect>
          <Container class="container">
            <LinkContainer to="/">
              <Navbar.Brand>
                <i class="fa fa-birthday-cake" aria-hidden="true"></i> Cake Shop
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <LinkContainer to="/cart">
                  <Nav.Link className="cart">
                    <i className="fas fa-shopping-cart">{qty}</i> Cart
                  </Nav.Link>
                </LinkContainer>

                {user ? (
                  <NavDropdown title={user.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link className="sign">
                      <b>
                        <i className="fas fa-user"></i>
                      </b>
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {user && user.isAdmin && (
                  <NavDropdown title="Admin" id="adminment">
                    <LinkContainer to="/admin/userList">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
