import java.util.Optional;

public class User {

    private String name;
    private Cart cart = new Cart();

    private RestaurantManager manager;
    private Restaurant restaurant;
    public User(String name, RestaurantManager manager){
        this.name = name;
        this.manager = manager;
    }

    public Cart getCart(){
        return cart;
    }

    public Restaurant getResaturant(String location){
        Optional<Restaurant> res =manager.getRestauratByLocation(location);
        if(res.isPresent()){
            restaurant = res.get();
        }
        return restaurant;
    }

}