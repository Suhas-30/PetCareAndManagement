import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Restaurant {

    private static int counter = 0;
    private int id;
    private String name;
    private String location;

    List<MenuItem> menuItemList = new ArrayList<>();

    public Restaurant(String name, String location){
        this.id = ++counter;
        this.name = name;
        this.location = location;
    }

    public String getName(){ return name; }
    public String getLocation(){ return location; }

    void addMenuItem(MenuItem item){
        menuItemList.add(item);
    }

    public Optional<MenuItem> getMenuItem(String name){
        for(MenuItem menuItem: menuItemList){
            if(name.equals(menuItem.getName())){
                return Optional.of(menuItem);
            }
        }
        return Optional.empty();
    }
}