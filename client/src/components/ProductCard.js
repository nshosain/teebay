import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Divider, Button } from "semantic-ui-react";
//moement helps show posted time ago, pretty cool
import moment from "moment";

import { AuthContext } from "../context/auth";
import BuyButton from "./BuyButton";

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
    console.log("rent product!");
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
              <Icon name="user" style={{ margin: 0 }} />
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
        {/* shows buy and rent buttons when product is posted by other users */}
        {user && !(user.id === ownner_id) && (
          //buy button
          <>
            <BuyButton product={{ id }} />
            <Button animated="horizontal" onClick={rentProduct} color="blue">
              <Button.Content hidden>Rent</Button.Content>
              <Button.Content visible>
                <Icon name="handshake outline" />
              </Button.Content>
            </Button>
          </>
        )}

        {user && user.id === ownner_id && (
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => console.log("Delete Post")}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default ProductCard;
