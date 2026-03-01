import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Cart {

    private List<MenuItem> items = new ArrayList<>();
    public void addItems(MenuItem item){
        items.add(item);
    }
    public List<MenuItem> getItems(){
        return items;
    }
    public double getTotal(){
        double total = 0;
        for(MenuItem item:items){
            total = total + item.getPrice();
        }
        return total;
    }

}