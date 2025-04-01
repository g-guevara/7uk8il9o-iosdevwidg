// app/EventStats.tsx
import React, { useEffect } from "react";
import { View, ScrollView, NativeModules, Platform } from "react-native";
import { styles } from "./styles/Index.styles";
import { useEventStats } from "./EventProvider/useEventStats";
import EventCard from "./EventProvider/EventCard";
import TimeGapIndicator from "./EventProvider/TimeGapIndicator";
import EventStatsEmptyState from "./EventProvider/EventStatsEmptyState";

// Interfaz para el módulo nativo
interface EventLogSharingInterface {
  saveEventLog: (logText: string) => Promise<boolean>;
}

// Obtener el módulo nativo si existe
const EventLogSharing = Platform.OS === 'ios' 
  ? NativeModules.EventLogSharing as EventLogSharingInterface
  : null;

interface EventStatsProps {
  isDarkMode: boolean;
  navigation: any;
}

const EventStats: React.FC<EventStatsProps> = ({ isDarkMode, navigation }) => {
  const { cardEvents, timeGaps, isLoading, selectedEvents } = useEventStats(navigation);
  
  // Compartir eventos con el widget cuando se carguen
  useEffect(() => {
    if (!isLoading && Platform.OS === 'ios' && EventLogSharing) {
      shareEventsWithWidget();
    }
  }, [isLoading, cardEvents, selectedEvents]);
  
  // Función para compartir el texto del log con el widget
  const shareEventsWithWidget = () => {
    if (EventLogSharing) {
      try {
        // Construir el texto del log similar al que se muestra en la consola
        let logText = `Total de eventos guardados: ${selectedEvents.length}\n`;
        
        // Agregar cada evento para hoy en el formato que se muestra en el log
        if (cardEvents.length > 0) {
          cardEvents.forEach(event => {
            const original = selectedEvents.find(e => e._id === event.id);
            if (original) {
              logText += `Evento coincide con día actual: ${original.Evento} (${original.diaSemana || 'Hoy'})\n`;
            }
          });
          
          logText += `Eventos filtrados para hoy: ${cardEvents.length}`;
        } else {
          logText += "No hay eventos para hoy";
        }
        
        // Guardar el texto del log para el widget
        EventLogSharing.saveEventLog(logText)
          .then(() => console.log("Log de eventos guardado para el widget"))
          .catch(error => console.error("Error al guardar log para widget:", error));
      } catch (error) {
        console.error("Error al compartir eventos con el widget:", error);
      }
    }
  };
  
  // Show empty state if no events and not loading
  if (cardEvents.length === 0 && !isLoading) {
    return <EventStatsEmptyState isDarkMode={isDarkMode} navigation={navigation} />;
  }
  
  return (
    <View style={styles.mainContentContainer}>
      {/* Add spacing at the top to prevent overlap with the date header */}
      <View style={{ height: 110 }} />
      
      {/* Event List with ScrollView */}
      <ScrollView
        style={styles.eventListContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.eventListContentContainer}
      >
        {cardEvents.map((event, index) => (
          <React.Fragment key={`event-block-${event.id}`}>
            {/* Event Card */}
            <EventCard event={event} />
            
            {/* Add time gap indicator if this isn't the last event */}
            {index < timeGaps.length && (
              <TimeGapIndicator 
                hoursDiff={timeGaps[index].hoursDiff} 
                minutesDiff={timeGaps[index].minutesDiff} 
              />
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default EventStats;