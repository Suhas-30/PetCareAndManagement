import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RestaurantManager {
    List<Restaurant> restaurantList = new ArrayList<>();

    public void addRestaurantList(Restaurant restaurant){
        restaurantList.add(restaurant);
    }

    public Optional<Restaurant> getRestauratByLocation(String location){
        for(Restaurant res:restaurantList){
            if(location.equals(res.getLocation())){
                return  Optional.of(res);
            }
        }
        System.out.println("Resturant is not found");
        return  Optional.empty();
    }

    public

}