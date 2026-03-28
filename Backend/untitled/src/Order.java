import java.util.ArrayList;
import java.util.List;

public class Order {

    private static int counter = 0;

    private int id;
    private Restaurant res;
    private List<MenuItem> orderList;
    private double totalPrice;

    public Order(Restaurant res, List<MenuItem> items){
        this.id = ++counter;
        this.res = res;
        this.orderList = new ArrayList<>(items);

        calculateTotal();
    }

    private void calculateTotal(){
        totalPrice = 0;
        for(MenuItem item : orderList){
            totalPrice += item.getPrice();
        }
    }

    public void printOrder(){
        System.out.println("Order Id: " + id);
        System.out.println("Restaurant: " + res.getName());
        System.out.println("Total Price: " + totalPrice);
    }
}