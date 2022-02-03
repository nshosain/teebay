import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Divider, Button, Modal } from "semantic-ui-react";
//moement helps show posted time ago, pretty cool
import moment from "moment";

import { AuthContext } from "../context/auth";
import BuyButton from "./BuyButton";
import DeleteButton from "./DeleteButton";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//configuring Toast
toast.configure();

function ProductCard({
  product: {
    id,
    product_name,
    product_details,
    ownner_id,
    owner_name,
    category,
    sell_price,
    rent_price,
    is_sold,
    is_lent,
    bought_by_user,
    borrowed_by_user,
    created_at,
  },
}) {
  //getting user form context
  //seeing if we're logged in
  const { user } = useContext(AuthContext);

  function rentProduct() {
    toast.warning("Tenting is not available yet!");
  }
  return (
    //fluid propertry helps take up more space
    <Card fluid>
      <Card.Content>
        {/* cliking product_name will take to it's own */}
        <Card.Header as={Link} to={`/products/${id}`}>
          {product_name}
          {/* shows user icon when own product is displayed */}
          {user && user.id === ownner_id && (
            <Button as="div" className="ui basic button" floated="right">
              <Icon name="user" color="teal" style={{ margin: 0 }} />
            </Button>
          )}
        </Card.Header>
        <Card.Meta>{`Posted by ${owner_name} ${moment(
          created_at
        ).fromNow()}`}</Card.Meta>
        <Divider hidden />

        <Card.Meta>{`Category: ${category}`}</Card.Meta>
        <Card.Meta>{`Sell Price: ${sell_price} TK. | Rent Price: ${rent_price} TK.`}</Card.Meta>

        <Card.Description>{product_details}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* shows buy and rent buttons when product is posted by other users and user is logged in*/}
        {/* else shows a availavbe text */}
        {user && !(user.id === ownner_id) && is_sold === "0" ? (
          <>
            {/* //buy button, confirm, action => buyButton component */}
            <Modal
              trigger={
                <Button animated="vertical" color="teal">
                  <Button.Content hidden>Buy</Button.Content>
                  <Button.Content visible>
                    <Icon name="shop" />
                  </Button.Content>
                </Button>
              }
              header="Buy Product"
              content="Are you sure you want to buy this product?"
              actions={[
                <span>
                  {/* goes to BuyButton component, initially I wanted to make each
                  action a compoment of their own later when I came back to the
                  code found it a bit messy so I had to improvise as I had other
                  major tasks to be comleted */}
                  <BuyButton product={{ id }} />
                </span>,
                "Cancel",
              ]}
            />
            <Button animated="horizontal" onClick={rentProduct} color="blue">
              <Button.Content hidden>Rent</Button.Content>
              <Button.Content visible>
                <Icon name="handshake outline" />
              </Button.Content>
            </Button>
          </>
        ) : (
          is_sold === "0" && (
            <span className="available-text">PRODUCT AVAILABLE!</span>
          )
        )}
        {/* shows when this product is sold */}
        {is_sold === "1" && <span className="sold-text">PRODUCT SOLD!</span>}
        {/* shows delete option if owner is loggedin */}
        {user && user.id === ownner_id && <DeleteButton product={{ id }} />}
      </Card.Content>
    </Card>
  );
}

export default ProductCard;
