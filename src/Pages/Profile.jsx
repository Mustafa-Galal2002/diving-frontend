import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import AxiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const handleOpenFavorites = async () => {
    try {
      const response = await AxiosInstance.get("/profiles/me/");
      setFavoriteItems(response.data.favorites);
      setShowFavoritesModal(true);
    } catch (error) {
      toast.error("Error fetching favorites:", error);
    }
  };

  const handleToggleFavorite = async (courseId) => {
    try {
      await AxiosInstance.post(`/profiles/${courseId}/toggle_favorite/`);
      handleOpenFavorites();
    } catch (error) {
      toast.error("Error toggling favorite:", error);
    }
  };

  const getUserProfile = async () => {
    let response = await AxiosInstance.get(`/users/${user.user_id}/`);
    setProfile(response.data);
  };

  const getUserOrders = async () => {
    try {
      let response = await AxiosInstance.get(`/orders/`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserOrders();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow rounded-4 p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-capitalize mb-0">
            {profile.first_name} {profile.last_name}
          </h4>
          <button className="btn btn-dark btn-sm" onClick={logoutUser}>
            Logout
          </button>
        </div>

        <h6 className="fw-semibold mb-2">Your Orders</h6>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="mb-2">
              <p className="mb-1">
                <strong>Order #{order.id}</strong> - {order.created_at}
              </p>
              <p className="mb-1">Total: ${order.total_price}</p>
              <p className="mb-1">Status: {order.paid ? "Paid" : "Pending"}</p>
            </div>
          ))
        ) : (
          <p className="text-muted">No orders placed yet.</p>
        )}

        <hr className="my-3" />

        <div className="d-flex flex-column gap-2">
          <div
            className="text-muted small d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handleOpenFavorites}
          >
            <i className="fas fa-heart text-danger me-2" />
            Favorite Items
          </div>
          <div className="text-muted small d-flex align-items-center">
            <i className="fas fa-cog me-2" />
            Settings
          </div>
          <div className="text-muted small d-flex align-items-center">
            <i className="fas fa-user me-2" />
            Program Link
          </div>
        </div>
      </div>

      {showFavoritesModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Favorite Items</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowFavoritesModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {favoriteItems.length > 0 ? (
                  favoriteItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                    >
                      <div>
                        <strong>{item.title}</strong>
                        <p className="mb-1">
                          {item.description?.slice(0, 80)}...
                        </p>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleToggleFavorite(item.id)}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No favorite items found.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowFavoritesModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
